package com.aes256.backend.api;

import com.aes256.backend.service.Aes256Service;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class TestApi {
    private final Aes256Service aes256Service;

    @GetMapping("/user")
    public Map<String, String> encryptedUser() throws Exception {
        HashMap<String, String> user = new HashMap<>();
        user.put("id", this.aes256Service.encrypt("test@test.com"));
        user.put("name", this.aes256Service.encrypt("tester"));
        return user;
    }
}
