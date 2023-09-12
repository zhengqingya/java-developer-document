# synchronized锁升级

无锁 -> 偏向锁（适用于只有一个线程） -> 轻量级锁（CAS自旋） -> 重量级锁（cas不行了，升级，阻塞）

### 一、Synchronized的性能变化

1. java5以前,只有Synchronized,这个是操作系统级别的重量级操作,重量级锁,假如锁的竞争比较激烈的话,性能下降
2. 在Java早期版本中,synchronized属于重量级锁,效率低下,因为监视器锁(monitor)是依赖于底层的操作系统的Mutex
   Lock来实现的,挂起线程和恢复线程都需要转入内核态去完成,阻塞或唤醒一个Java线程需要操作系统切换CPU状态来完成,这种状态切换需要耗费处理器时间,如果同步代码块中内容过于简单,这种切换的时间可能比用户代码执行的时间还长”,时间成本相对较高,这也是为什么早期的synchronized效率低的原因  
   Java 6之后,为了减少获得锁和释放锁所带来的性能消耗,引入了轻量级锁和偏向锁
3. 为什么每一个对象都可以成为一个锁?
    1. Java对象是天生的Monitor,每一个Java对象都有成为Monitor的潜质,
       因为在Java的设计中,每一个Java对象自打娘胎里出来就带了一把看不见的锁,它叫做内部锁或者Monitor锁。
    2. Monitor的本质是依赖于底层操作系统的Mutex Lock实现,操作系统实现线程之间的切换需要从用户态到内核态的转换,成本非常高
       ![](images/synchronized-upgrade-01.png)
4. Mutex Lock  
   Monitor是在jvm底层实现的,底层代码是c++。本质是依赖于底层操作系统的Mutex
   Lock实现,操作系统实现线程之间的切换需要从用户态到内核态的转换,状态转换需要耗费很多的处理器时间成本非常高。所以synchronized是Java语言中的一个重量级操作。
5. Java 6之后,为了减少获得锁和释放锁所带来的性能消耗,引入了轻量级锁和偏向锁,需要有个逐步升级的过程,别一开始就捅到重量级锁
6. synchronized锁:由对象头中的Mark Word根据锁标志位的不同而被复用及锁升级策略  
   ![](images/synchronized-upgrade-17.png)

### 二、无锁

```
<!--
   JAVA object layout
   官网:http://openjdk.java.net/projects/code-tools/jol/
   定位:分析对象在JVM的大小和分布
   -->
<dependency>
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.16</version>
</dependency>
```

```
public class MyObject{
    public static void main(String[] args){
        Object o = new Object();
        System.out.println("10进制hash码:"+o.hashCode());
        System.out.println("16进制hash码:"+Integer.toHexString(o.hashCode()));
        System.out.println("2进制hash码:"+Integer.toBinaryString(o.hashCode()));
        System.out.println( ClassLayout.parseInstance(o).toPrintable());
    }
}
```

程序不会有锁的竞争

```shell
10进制hash码:285377351
16进制hash码:11028347
2进制hash码:10001000000101000001101000111
java.lang.Object object internals:
OFF  SZ   TYPE DESCRIPTION               VALUE
  0   8        (object header: mark)     0x0000001102834701 (hash: 0x11028347; age: 0)
  8   4        (object header: class)    0x200001e5
 12   4        (object alignment gap)    
Instance size: 16 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total
```

### 三、偏向锁 单个线程多次访问

* ①. 主要作用:当一段同步代码一直被同一个线程多次访问,由于只有一个线程那么该线程在后续访问时便会自动获得锁(偏向锁)  
  同一个老顾客来访,直接老规矩行方便  
  偏向锁为了解决只有在一个线程执行同步时提高性能
* ②. 64位标记图再看(通过CAS方式修改markword中的线程ID)  
  ![](images/synchronized-upgrade-02.png)
* ③. 偏向锁的理论
    1. 在实际应用运行过程中发现,“锁总是同一个线程持有,很少发生竞争”,也就是说锁总是被第一个占用他的线程拥有,这个线程就是锁的偏向线程
    2. 那么只需要在锁第一次被拥有的时候,记录下偏向线程ID。这样偏向线程就一直持有着锁(
       后续这个线程进入和退出这段加了同步锁的代码块时,不需要再次加锁和释放锁。而是直接比较对象头里面是否存储了指向当前线程的偏向锁)。
    3.
  如果相等表示偏向锁是偏向于当前线程的,就不需要再尝试获得锁了,直到竞争发生才释放锁。以后每次同步,检查锁的偏向线程ID与当前线程ID是否一致,如果一致直接进入同步。无需每次加锁解锁都去CAS更新对象头。如果自始至终使用锁的线程只有一个,很明显偏向锁几乎没有额外开销,性能极高。
    4. 假如不一致意味着发生了竞争,锁已经不是总是偏向于同一个线程了,这时候可能需要升级变为轻量级锁,才能保证线程间公平竞争锁。偏向锁只有遇到其他线程尝试竞争偏向锁时,持有偏向锁的线程才会释放锁,线程是不会主动释放偏向锁的
* ④. 技术实现  
  一个synchronized方法被一个线程抢到了锁时,那这个方法所在的对象就会在其所在的Mark
  Word中将偏向锁修改状态位,同时还会有占用前54位来存储线程指针作为标识。若该线程再次访问同一个synchronized方法时,该线程只需去对象头的Mark
  Word 中去判断一下是否有偏向锁指向本身的ID,无需再进入Monitor去竞争对象了。  
  ![](images/synchronized-upgrade-03.png)
* ⑤. 对于如上的③、④进行细化
  > 步骤:  
  > (1).
  > 偏向锁的操作不用直接捅到操作系统,不涉及用户到内核转换,不必要直接升级为最高级,我们以一个account对象的“对象头”为例,  
  > ![](images/synchronized-upgrade-04.png)  
  > (2). 假如有一个线程执行到synchronized代码块的时候,JVM使用CAS操作把线程指针ID记录到Mark
  > Word当中,并修改标偏向标示,标示当前线程就获得该锁。锁对象变成偏向锁(通过CAS修改对象头里的锁标志位)
  > ,字面意思是“偏向于第一个获得它的线程”的锁。执行完同步代码块后,线程并不会主动释放偏向锁。  
  > ![](images/synchronized-upgrade-05.png)  
  > (3). 这时线程获得了锁,可以执行同步代码块。当该线程第二次到达同步代码块时会判断此时持有锁的线程是否还是自己(
  > 持有锁的线程ID也在对象头里),JVM通过account对象的Mark Word判断:
  > 当前线程ID还在,说明还持有着这个对象的锁,就可以继续进入临界区工作。由于之前没有释放锁,这里也就不需要重新加锁。
  > 如果自始至终使用锁的线程只有一个,很明显偏向锁几乎没有额外开销,性能极高。  
  > (4). 结论:JVM不用和操作系统协商设置Mutex(争取内核),它只需要记录下线程ID就标示自己获得了当前锁,不用操作系统接入。  
  > 上述就是偏向锁:在没有其他线程竞争的时候,一直偏向偏心当前线程,当前线程可以一直执行。
* ⑥. 重要参数说明
  ```
  * 实际上偏向锁在JDK1.6之后是默认开启的,但是启动时间有延迟,
  * 所以需要添加参数-XX:BiasedLockingStartupDelay=0,让其在程序启动时立刻启动。
  * 开启偏向锁:
  * -XX:+UseBiasedLocking -XX:BiasedLockingStartupDelay=0
  * 关闭偏向锁:关闭之后程序默认会直接进入轻量级锁状态。
  * -XX:-UseBiasedLocking
  ```
* ⑦. 代码展示
    1.
  偏向锁在JDK1.6以上默认开启,开启后程序启动几秒后才会被激活,可以使用JVM参数来关闭延迟 `-XX:BiasedLockingStartupDelay=0`
    2. 如果确定锁通常处于竞争状态则可通过JVM参数 `-XX:-UseBiasedLocking` 关闭偏向锁,那么默认会进入轻量级锁
  ```
  public class MyObject{
      public static void main(String[] args){
          Object o = new Object();
  
          new Thread(() -> {
              synchronized (o){
                  System.out.println(ClassLayout.parseInstance(o).toPrintable());
              }
          },"t1").start();
      }
  }
  ```
  ![](images/synchronized-upgrade-06.png)
  ![](images/synchronized-upgrade-07.png)
* ⑧. 偏向锁的撤销(
  偏向锁使用一种等到竞争出现才释放锁的机制,只有当其他线程竞争锁时,持有偏向锁的原来线程才会被撤销。撤销需要等待全局安全点(
  该时间点上没有字节码正在执行),同时检查持有偏向锁的线程是否还在执行)
    1. 第一个线程正在执行synchronized方法(处于同步块),它还没有执行完,其它线程来抢夺,该偏向锁会被取消掉并出现锁升级  
       此时轻量级锁由原持有偏向锁的线程持有,继续执行其同步代码,而正在竞争的线程会进入自旋等待获得该轻量级锁
    2. 第一个线程执行完成synchronized方法(退出同步块),则将对象头设置成无锁状态并撤销偏向锁 ,重新偏向  
       (我的理解是,其实如果线程A执行完毕,如果不再去竞争,那么就会重新线程B为偏向锁;如果线程A继续竞争,那么就会CAS自旋
       也就升级到了轻量级锁)
       ![](images/synchronized-upgrade-08.png)
       ![](images/synchronized-upgrade-09.png)

### 四、轻量级锁 多个线程竞争

* ①. 主要作用(本质就是自旋锁)  
  有线程来参与锁的竞争,但是获取锁的冲突时间极短
* ②. 64位标记图再看  
  ![](images/synchronized-upgrade-10.png)
* ③. 轻量级锁的获取
  > 理论落地  
  > (1). 轻量级锁是为了在线程近乎交替执行同步块时提高性能  
  > (2). 主要目的: 在没有多线程竞争的前提下,通过CAS减少重量级锁使用操作系统互斥量产生的性能消耗,说白了先自旋再阻塞  
  > (3). 升级时机:当关闭偏向锁功能或多线程竞争偏向锁会导致偏向锁升级为轻量级锁  
  > (4). 假如线程A已经拿到锁,这时线程B又来抢该对象的锁,由于该对象的锁已经被线程A拿到,当前该锁已是偏向锁了。  
  > 而线程B在争抢时发现对象头Mark Word中的线程ID不是线程B自己的线程ID(而是线程A),那线程B就会进行CAS操作希望能获得锁。  
  > 此时线程B操作中有两种情况  
  > 如果锁获取成功,直接替换Mark Word中的线程ID为B自己的ID(A → B),重新偏向于其他线程(
  即将偏向锁交给其他线程,相当于当前线程"
  > 被"释放了锁),该锁会保持偏向锁状态,A线程Over,B线程上位  
  > ![](images/synchronized-upgrade-11.png)
  >
  如果锁获取失败,则偏向锁升级为轻量级锁,此时轻量级锁由原持有偏向锁的线程持有,继续执行其同步代码,而正在竞争的线程B会进入自旋等待获得该轻量级锁。
  > ![](images/synchronized-upgrade-12.png)
* ④. 代码展示  
  如果关闭偏向锁,就可以直接进入轻量级锁 -XX:-UseBiasedLocking
  ![](images/synchronized-upgrade-13.png)
* ⑤. 自旋达到一定次数和程度
    1. java6之前(了解):默认启用,默认情况下自旋的次数是10次,-XX:PreBlockSpin=10来修改或者自旋线程数超过cpu核数一半
    2. Java6之后:自适应(自适应意味着自旋的次数不是固定不变的),而是根据:同一个锁上一次自旋的时间和拥有锁线程的状态来决定。
* ⑥. 轻量锁与偏向锁的区别和不同
    1. 争夺轻量级锁失败时,自旋尝试抢占锁
    2. 轻量级锁每次退出同步块都需要释放锁,而偏向锁是在竞争发生时才释放锁

### 五、重锁 会有用户态、内核态切换

* ①. 有大量的线程参与锁的竞争,冲突性很高
* ②. 锁标志位  
  ![](images/synchronized-upgrade-14.png)
* ③. 代码展示:  
  ![](images/synchronized-upgrade-15.png)

### 六、各种锁优缺点、synchronized锁升级和实现原理

* ①. 各个锁的优缺点的对比  
  ![](images/synchronized-upgrade-16.png)
* ②. synchronized锁升级过程总结:一句话,就是先自旋,不行再阻塞。  
  实际上是把之前的悲观锁(重量级锁)变成在一定条件下使用偏向锁以及使用轻量级(自旋锁CAS)的形式
* ③. synchronized在修饰方法和代码块在字节码上实现方式有很大差异,但是内部实现还是基于对象头的MarkWord来实现的
* ④. JDK1.6之前synchronized使用的是重量级锁,JDK1.6之后进行了优化,拥有了无锁->偏向锁->轻量级锁->
  重量级锁的升级过程,而不是无论什么情况都使用重量级锁。
* ⑤. 偏向锁、轻量级锁、重量级锁总结
    1. 偏向锁:适用于单线程适用的情况,在不存在锁竞争的时候进入同步方法/代码块则使用偏向锁。
    2. 轻量级锁:适用于竞争较不激烈的情况(这和乐观锁的使用范围类似),
       存在竞争时升级为轻量级锁,轻量级锁采用的是自旋锁,如果同步方法/代码块执行时间很短的话,采用轻量级锁虽然会占用cpu资源但是相对比使用重量级锁还是更高效。
    3. 重量级锁:适用于竞争激烈的情况,如果同步方法/代码块执行时间很长,那么使用轻量级锁自旋带来的性能消耗就比使用重量级锁更严重,这时候就需要升级为重量级锁

### 七、锁消除

* 锁消除:从JIT角度看相当于无视它,synchronized (o)不存在了,这个锁对象并没有被共用扩散到其它线程使用,极端的说就是根本没有加这个锁对象的底层机器码,消除了锁的使用

```
**
 * 锁消除
 * 从JIT角度看相当于无视它,synchronized (o)不存在了,这个锁对象并没有被共用扩散到其它线程使用,
 * 极端的说就是根本没有加这个锁对象的底层机器码,消除了锁的使用
 */
public class LockClearUPDemo{
    static Object objectLock = new Object();//正常的

    public void m1(){
        // 锁消除,JIT会无视它,synchronized(对象锁)不存在了。不正常的
        Object o = new Object();

        synchronized (o){
            System.out.println("-----hello LockClearUPDemo"+"\t"+o.hashCode()+"\t"+objectLock.hashCode());
        }
    }

    public static void main(String[] args){
        LockClearUPDemo demo = new LockClearUPDemo();

        for (int i = 1; i <=10; i++) {
            new Thread(() -> {
                demo.m1();
            },String.valueOf(i)).start();
        }
    }
}
```

### 八、锁粗化

* 锁粗化:假如方法中首尾相接,前后相邻的都是同一个锁对象,那JIT编译器就会把这几个synchronized块合并成一个大块,加粗加大范围,一次申请锁使用即可,避免次次的申请和释放锁,提升了性能

```
/**
 * 锁粗化
 * 假如方法中首尾相接,前后相邻的都是同一个锁对象,那JIT编译器就会把这几个synchronized块合并成一个大块,
 * 加粗加大范围,一次申请锁使用即可,避免次次的申请和释放锁,提升了性能
 */
public class LockBigDemo
{
    static Object objectLock = new Object();

    public static void main(String[] args)
    {
        new Thread(() -> {
            synchronized (objectLock) {
                System.out.println("11111");
            }
            synchronized (objectLock) {
                System.out.println("22222");
            }
            synchronized (objectLock) {
                System.out.println("33333");
            }
        },"a").start();

        new Thread(() -> {
            synchronized (objectLock) {
                System.out.println("44444");
            }
            synchronized (objectLock) {
                System.out.println("55555");
            }
            synchronized (objectLock) {
                System.out.println("66666");
            }
        },"b").start();

    }
}
```



