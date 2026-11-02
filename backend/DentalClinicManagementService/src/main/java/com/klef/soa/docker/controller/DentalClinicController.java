
package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.soa.docker.dto.DentalClinicRequest;
import com.klef.soa.docker.dto.DentalClinicResponse;
import com.klef.soa.docker.service.DentalClinicService;

import jakarta.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/dentalclinic")
public class DentalClinicController
{
    @Autowired
    private DentalClinicService service;

    @GetMapping("/")
    public String home()
    {
        return "Dental Clinic Management Project";
    }

    @PostMapping("/add")
    public ResponseEntity<DentalClinicResponse> saveDentalClinic(@Valid @RequestBody DentalClinicRequest request)
    {
        return new ResponseEntity<>(
                service.saveDentalClinic(request), HttpStatus.CREATED);
    }

    @GetMapping("/displayall")
    public ResponseEntity<List<DentalClinicResponse>> getAllDentalClinics()
    {
        return ResponseEntity.ok(service.getAllDentalClinics());
    }

    @GetMapping("/display/id/{id}")
    public ResponseEntity<?> getDentalClinicById(@PathVariable Long id)
    {
        DentalClinicResponse dentalClinic =
                service.getDentalClinicById(id);

        if(dentalClinic != null)
        {
            return ResponseEntity.ok(dentalClinic);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Dental Clinic Id Not Found");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateDentalClinic(@PathVariable Long id, @Valid @RequestBody DentalClinicRequest request)
    {
        DentalClinicResponse dentalClinic =
                service.updateDentalClinic(id, request);

        if(dentalClinic != null)
        {
            return ResponseEntity.ok(dentalClinic);
        }
        else
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Dental Clinic Id Not Found to Update");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteDentalClinic(@PathVariable Long id)
    {
        String output = service.deleteDentalClinic(id);

        if(output.equals("Dental Clinic Id Not Found To Delete"))
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(output);
        }

        return ResponseEntity.ok(output);
    }
}
