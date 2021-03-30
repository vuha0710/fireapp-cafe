package com.tony.web.rest.errors;

import org.zalando.problem.AbstractThrowableProblem;
import org.zalando.problem.Status;

public class FileNotFoundException extends AbstractThrowableProblem {

    private static final long serialVersionUID = 1L;

    public FileNotFoundException() {
        super(ErrorConstants.NOT_FOUND_TYPE, "File not found", Status.NOT_FOUND);
    }
}
