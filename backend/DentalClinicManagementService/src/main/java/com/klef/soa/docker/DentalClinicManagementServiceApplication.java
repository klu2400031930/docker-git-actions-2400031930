
package com.klef.soa.docker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DentalClinicManagementServiceApplication {

    public static void main(String[] args) 
    {
        SpringApplication.run(DentalClinicManagementServiceApplication.class, args);
        System.out.println("Dental Clinic Management Service is Running ...!!!");
    }
}
