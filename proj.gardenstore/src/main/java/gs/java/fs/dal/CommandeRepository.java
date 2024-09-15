package gs.java.fs.dal;

import gs.java.fs.domain.entities.Commande;
import jakarta.persistence.metamodel.SingularAttribute;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.io.Serializable;

@Repository
public interface CommandeRepository extends JpaRepository<Commande, Long> {

}