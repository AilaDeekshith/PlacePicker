package com.example.PlacePicker.Controller;

import com.example.PlacePicker.Model.Place;
import com.example.PlacePicker.Repository.PlacesRepo;
import com.example.PlacePicker.Service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/PlacePicker")
public class HomeController {

    @Autowired
    private PlacesRepo placesRepo;
    @Autowired
    private HomeService homeService;

    @GetMapping("/getAllPlaces")
    public List<Place> getAllPlaces(){
        return placesRepo.findAll();
    }

    @PostMapping("/addPlace")
    public void addPlace(@RequestParam("data") String place,@RequestParam("file") MultipartFile file) throws IOException {
        homeService.save(place,file);
    }
}
