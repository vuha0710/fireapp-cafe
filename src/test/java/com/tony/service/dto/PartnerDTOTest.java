package com.tony.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.tony.web.rest.TestUtil;

public class PartnerDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PartnerDTO.class);
        PartnerDTO partnerDTO1 = new PartnerDTO();
        partnerDTO1.setId(1L);
        PartnerDTO partnerDTO2 = new PartnerDTO();
        assertThat(partnerDTO1).isNotEqualTo(partnerDTO2);
        partnerDTO2.setId(partnerDTO1.getId());
        assertThat(partnerDTO1).isEqualTo(partnerDTO2);
        partnerDTO2.setId(2L);
        assertThat(partnerDTO1).isNotEqualTo(partnerDTO2);
        partnerDTO1.setId(null);
        assertThat(partnerDTO1).isNotEqualTo(partnerDTO2);
    }
}
