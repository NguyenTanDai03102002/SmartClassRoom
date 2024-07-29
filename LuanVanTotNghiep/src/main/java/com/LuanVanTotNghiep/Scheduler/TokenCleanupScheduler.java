package com.LuanVanTotNghiep.Scheduler;

import com.LuanVanTotNghiep.repository.InvalidatedTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

public class TokenCleanupScheduler {
    @Autowired
    private InvalidatedTokenRepository invalidatedTokenRepository;

    // Lên lịch xóa token vào mỗi 0h mỗi ngày
    @Scheduled(cron = "0 0 0 * * ?")
    @Transactional
    public void scheduleTokenCleanup() {
        Date now = new Date();
        invalidatedTokenRepository.deleteByExpiryTimeBefore(now);
    }
}
