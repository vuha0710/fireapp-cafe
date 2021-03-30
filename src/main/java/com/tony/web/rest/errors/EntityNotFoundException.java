package com.tony.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class EntityNotFoundException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    public EntityNotFoundException() {
        super(ErrorConstants.NOT_FOUND_TYPE, "Entity not found", Status.NOT_FOUND);
    }
}
