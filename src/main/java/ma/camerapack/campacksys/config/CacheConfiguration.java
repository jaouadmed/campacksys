package ma.camerapack.campacksys.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.serviceregistry.Registration;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, ma.camerapack.campacksys.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, ma.camerapack.campacksys.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, ma.camerapack.campacksys.domain.User.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Authority.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.User.class.getName() + ".authorities");
            createCache(cm, ma.camerapack.campacksys.domain.Client.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Supplier.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Employee.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Team.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Mission.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Duration.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Category.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Product.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Stock.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Unit.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Alert.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.OrderStock.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Order.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.ItemLine.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Discount.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Payment.class.getName());
            createCache(cm, ma.camerapack.campacksys.domain.Bill.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }
}
