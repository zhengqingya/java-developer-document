package com.zhengqing;

/**
 * Hello world!
 */
public class App {
    public static void main(String[] args) {
        System.out.println("Hello World!");
        for (int i = 0; i < args.length; i++) {
            System.out.println("arg" + (i + 1) + ": " + args[i]);
        }
    }
}
