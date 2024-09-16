package gs.java.fs.api.validation.validator;

import gs.java.fs.api.validation.constraints.Password;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<Password, String> {


    private int minSize;

    @Override
    public void initialize(Password constraintAnnotation) {
        this.minSize = constraintAnnotation.minLength();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if( value == null )
            return false;

        String regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$";
        return value.matches(regexp);
    }
}