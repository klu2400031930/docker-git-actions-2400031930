
package com.klef.soa.docker.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DentalClinicResponse
{
    private Long id;
    private String clinicName;
    private String dentistName;
    private String phone;
    private double consultationFee;
}
