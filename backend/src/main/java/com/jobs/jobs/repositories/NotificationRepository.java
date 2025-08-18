package com.rihal.Jobfinder.repo;

import com.rihal.Jobfinder.Notification;
import com.rihal.Jobfinder.NotificationId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, NotificationId> { }
