package gs.java.fs.api.controller;
import gs.java.fs.api.models.dtos.CommandeDTO;
import gs.java.fs.api.models.form.CommandeForm;
import gs.java.fs.bll.CommandeService;
import gs.java.fs.domain.entities.Commande;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("commande")
@CrossOrigin("*")
@Valid

public class CommandeController {
    private final CommandeService commandeService;

    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    @GetMapping
    public ResponseEntity<List<CommandeDTO>> getAll() {
        List<Commande> commandes = commandeService.getAll();
        List<CommandeDTO> dtos = commandes.stream()
                .map(CommandeDTO::fromEntity)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommandeDTO> getOne(@PathVariable Long id) {
        Commande commande = commandeService.getOne(id);
        CommandeDTO dto = CommandeDTO.fromEntity(commande);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/register/commande")
    public ResponseEntity<CommandeDTO> register(@RequestBody @Valid CommandeForm form) {
        Commande commande = form.toEntity();
        commande = commandeService.register(commande);
        CommandeDTO dto = CommandeDTO.fromEntity(commande);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommandeDTO> update(@PathVariable Long id, @RequestBody @Valid CommandeForm form) {
        Commande commande = commandeService.getOne(id);
        commande.setQuantite(form.quantité());
        commande.setNCommande(form.n_commande());
        commande.setDateCommande(form.date_commande());
        Commande com = commandeService.update(id,commande);
        return ResponseEntity.ok(CommandeDTO.fromEntity(com));

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<CommandeDTO> delete(@PathVariable Long id) {

        if ((boolean) commandeService.cancel(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
