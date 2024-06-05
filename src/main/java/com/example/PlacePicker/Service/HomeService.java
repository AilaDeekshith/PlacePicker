package com.example.PlacePicker.Service;

import com.example.PlacePicker.Model.Image;
import com.example.PlacePicker.Model.Place;
import com.example.PlacePicker.Repository.PlacesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class HomeService {

    @Autowired
    private PlacesRepo placesRepo;

    public void save(String place, MultipartFile file) throws IOException {
        Image image = new Image();
        Place place1 = new Place();
        String arr[] = place.split(",");
        for(int i=0;i<arr.length;i++){
            String arr1[] = arr[i].split(":");
            if(i==0){
                place1.setId(arr1[1]);
            }
            else if(i==1){
                place1.setTitle(arr1[1]);
            }
            else if(i==2){
                place1.setLat(Double.parseDouble(arr1[1]));
            }
            else{
                place1.setLon(Double.parseDouble(arr1[1]));
            }
        }
        image.setName(file.getOriginalFilename());
        image.setType(file.getContentType());
        image.setData(file.getBytes());
        place1.setImage(image);
        placesRepo.save(place1);
    }
}
