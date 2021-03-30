package com.tony.web.rest;

import com.tony.service.DataInsightService;
import com.tony.service.dto.HomeDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HomeResource {

    @Autowired
    DataInsightService dataInsightService;

    @GetMapping("/public/home")
    public ResponseEntity<HomeDTO> getDataHome() {
        HomeDTO result = dataInsightService.getDataHome();
        return ResponseEntity.ok(result);
    }

}
