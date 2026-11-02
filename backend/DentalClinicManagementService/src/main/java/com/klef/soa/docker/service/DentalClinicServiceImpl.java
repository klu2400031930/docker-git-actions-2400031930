
package com.klef.soa.docker.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.soa.docker.dto.DentalClinicRequest;
import com.klef.soa.docker.dto.DentalClinicResponse;
import com.klef.soa.docker.entity.DentalClinicEntity;
import com.klef.soa.docker.repository.DentalClinicRepository;

@Service
public class DentalClinicServiceImpl implements DentalClinicService
{
    @Autowired
    private DentalClinicRepository repo;

    @Override
    public DentalClinicResponse saveDentalClinic(DentalClinicRequest request)
    {
        DentalClinicEntity dentalClinic = DentalClinicEntity.builder()
                .clinicName(request.getClinicName())
                .dentistName(request.getDentistName())
                .phone(request.getPhone())
                .consultationFee(request.getConsultationFee())
                .build();

        DentalClinicEntity savedClinic = repo.save(dentalClinic);
        return mapToResponse(savedClinic);
    }

    @Override
    public List<DentalClinicResponse> getAllDentalClinics()
    {
        return repo.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public DentalClinicResponse getDentalClinicById(Long id)
    {
        Optional<DentalClinicEntity> optional = repo.findById(id);

        if(optional.isPresent())
        {
            return mapToResponse(optional.get());
        }
        else
        {
            return null;
        }
    }

    @Override
    public DentalClinicResponse updateDentalClinic(Long id, DentalClinicRequest request)
    {
        Optional<DentalClinicEntity> optional = repo.findById(id);

        if(optional.isPresent())
        {
            DentalClinicEntity dentalClinic = optional.get();

            dentalClinic.setClinicName(request.getClinicName());
            dentalClinic.setDentistName(request.getDentistName());
            dentalClinic.setPhone(request.getPhone());
            dentalClinic.setConsultationFee(request.getConsultationFee());

            DentalClinicEntity updatedClinic = repo.save(dentalClinic);
            return mapToResponse(updatedClinic);
        }
        else
        {
            return null;
        }
    }

    @Override
    public String deleteDentalClinic(Long id)
    {
        boolean status = repo.existsById(id);

        if(status)
        {
            repo.deleteById(id);
            return "Dental Clinic Deleted Successfully";
        }
        else
        {
            return "Dental Clinic Id Not Found To Delete";
        }
    }

    private DentalClinicResponse mapToResponse(DentalClinicEntity dentalClinic)
    {
        return DentalClinicResponse.builder()
                .id(dentalClinic.getId())
                .clinicName(dentalClinic.getClinicName())
                .dentistName(dentalClinic.getDentistName())
                .phone(dentalClinic.getPhone())
                .consultationFee(dentalClinic.getConsultationFee())
                .build();
    }
}
