package com.example.PlacePicker.Repository;

import com.example.PlacePicker.Model.Place;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlacesRepo extends MongoRepository<Place,Integer> {
}
