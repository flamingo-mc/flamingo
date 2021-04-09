package nl.b3p.viewer.helpers.app;

import nl.b3p.viewer.config.app.Application;
import nl.b3p.viewer.config.app.Level;

import javax.persistence.EntityManager;
import java.util.HashSet;
import java.util.Set;

public class LevelHelper {

    /**
     * Find the applications this level is used in. Because of mashups a level
     * can be used in more than one application.
     *
     * @param em the entity manager to use
     * @return the applications this level is part of
     */
    public static Set<Application> findApplications(Level l, EntityManager em) {
        while(l.getParent() != null) {
            l = l.getParent();
        }

        Set<Application> apps = new HashSet();
        apps.addAll(em.createQuery(
                "from Application where root = :level")
                .setParameter("level", l)
                .getResultList());
        return apps;
    }
}
