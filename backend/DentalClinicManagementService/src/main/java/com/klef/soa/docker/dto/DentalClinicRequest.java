
package com.klef.soa.docker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import lombok.Data;

@Data
public class DentalClinicRequest
{
    @NotBlank(message = "Clinic name is required")
    private String clinicName;

    @NotBlank(message = "Dentist name is required")
    private String dentistName;

    @NotBlank(message = "Phone number is required")
    private String phone;

    @NotNull(message = "Consultation fee is required")
    @PositiveOrZero(message = "Consultation fee must be zero or greater")
    private Double consultationFee;
}
