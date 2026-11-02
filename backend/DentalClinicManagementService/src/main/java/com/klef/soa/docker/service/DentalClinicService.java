package com.klef.soa.docker.service;

import java.util.List;

import com.klef.soa.docker.dto.DentalClinicRequest;
import com.klef.soa.docker.dto.DentalClinicResponse;

public interface DentalClinicService
{
    DentalClinicResponse saveDentalClinic(DentalClinicRequest request);
    DentalClinicResponse updateDentalClinic(Long id, DentalClinicRequest request);
    List<DentalClinicResponse> getAllDentalClinics();
    DentalClinicResponse getDentalClinicById(Long id);
    String deleteDentalClinic(Long id);
}
