package gs.java.fs.api.controller;

import gs.java.fs.api.models.dtos.ProduitDTO;
import gs.java.fs.api.models.form.ProduitForm;
import gs.java.fs.bll.ProduitService;
import gs.java.fs.domain.entities.Produit;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/produit")
@CrossOrigin("*")

    public class ProduitController {
        private final ProduitService produitService;
        public ProduitController(ProduitService produitService) {
            this.produitService=produitService;
        }

        @GetMapping
        public ResponseEntity<List<ProduitDTO>> getAll() {
            return ResponseEntity.ok(
                    produitService.getAll().stream()
                            .map( ProduitDTO::fromEntity)
                            .toList()
            );
        }
        @GetMapping("/{id}")
        public ResponseEntity<ProduitDTO> getOne(@PathVariable Long id){
            return ResponseEntity.ok(
                    ProduitDTO.fromEntity( produitService.getOne(id))
            );
        }
        @GetMapping("/mobilier/{id}")
        public ResponseEntity<ProduitDTO> getOneId(@PathVariable Long id){
            return ResponseEntity.ok(
                    ProduitDTO.fromEntity( produitService.getOneId(id))
            );
        }
        @PostMapping("/add")
        public ResponseEntity<ProduitDTO> add(@RequestBody @Valid ProduitForm form){
            Produit produit = produitService.add( form.toEntity());
            ProduitDTO dto = ProduitDTO.fromEntity(produit);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(dto);
        }
        @PutMapping("/{id}")
        public ResponseEntity<ProduitDTO> update(@PathVariable Long id, @RequestBody @Valid ProduitForm form) {
            Produit produit= produitService.getOne(id);
            produit.setNom(form.nom());
            produit.setReference(form.reference());
            produit.setPrixDeVente(form.prixDeVente());
            Produit product = produitService.add(produit);
            return ResponseEntity.ok(ProduitDTO.fromEntity(product));
        }
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> delete(@PathVariable Long id){
            produitService.delete(id);
            return ResponseEntity.ok().build();
        }
    }


