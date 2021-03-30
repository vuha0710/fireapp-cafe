package com.tony.service.util;

import java.util.Random;

public class RandomUtil {

    public static String randomAlphabet(int numberOfLetter) {
        Random r = new Random();
        String alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < numberOfLetter; i++) {
            result.append(alphabet.charAt(r.nextInt(alphabet.length())));
        }
        return result.toString();
    }

}
