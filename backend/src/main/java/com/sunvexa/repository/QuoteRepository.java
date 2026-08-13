package com.sunvexa.repository;

import com.sunvexa.entity.Quote;
import com.sunvexa.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuoteRepository extends JpaRepository<Quote, Long> {
    List<Quote> findByUserOrderByCreatedAtDesc(User user);
    List<Quote> findByUserIdOrderByCreatedAtDesc(Long userId);
    List<Quote> findAllByOrderByCreatedAtDesc();
}
