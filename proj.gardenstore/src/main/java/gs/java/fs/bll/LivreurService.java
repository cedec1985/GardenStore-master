package gs.java.fs.bll;

import gs.java.fs.domain.entities.Livreur;

import java.util.List;

public interface LivreurService {
    Livreur getOne(Long id);
    List<Livreur> getAll();
    Livreur update(Long id, Livreur livreur);
    Livreur delete(Long id);
    Livreur add(Livreur livreur);
}
