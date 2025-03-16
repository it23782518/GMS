package com.example.GMS.repository;

import com.example.GMS.model.Equipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {
    List<Equipment> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCase(String search, String search1);
}