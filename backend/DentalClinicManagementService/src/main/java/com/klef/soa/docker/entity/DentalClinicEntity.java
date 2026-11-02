
package com.klef.soa.docker.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Entity
@Table(name = "dental_clinics")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DentalClinicEntity 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String clinicName;
    
    @Column(nullable = false)
    private String dentistName;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(nullable = false)
    private double consultationFee;
}
