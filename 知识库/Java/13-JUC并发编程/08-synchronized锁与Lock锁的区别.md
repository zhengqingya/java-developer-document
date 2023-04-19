# synchronized锁与Lock锁的区别

1. synchronized是内置的java关键字而Lock是一个接口
2. synchronized无法判断获取锁的状态,Lock可以判断是否获取到了锁
3. synchronized会自动释放锁,Lock必须要手动释放锁！否则会造成死锁.
4. synchronized 线程1(获得锁,阻塞),线程2(等待,傻傻的等);Lock锁就不会一直等下去
5. synchronized 可重入锁 不可以中断的 非公平,Lock 可重入锁 可以判断的 非公平(可以设置)
6. synchronized 适合锁少量同步代码,Lock适合锁大量同步代码.

### 锁是什么?如何判断锁的是谁?

- 锁是一种用于解决安全的机制
- java中锁一般都是锁的对象，或者锁的是需要进行增删改的属性或方法

### 都是可重入锁

重入锁是指同一个线程可以多次获取同一个锁，而不会形成死锁。

相比于synchronized，reentrantlock 是一种更加灵活和可控的可重入锁。
通过 reentrantlock 可以实现公平锁和非公平锁，并且锁的获取和释放都需要手动进行，更加自由。
同时，在某些场景下，reentrantlock 的性能也要优于 synchronized。

如果有2个Lock锁，那么解锁的时候，也要解2次，否则会出现死锁问题。

