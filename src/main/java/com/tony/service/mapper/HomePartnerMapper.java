package com.tony.service.mapper;

import com.tony.domain.Partner;
import com.tony.service.dto.HomePartnerDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {})
public interface HomePartnerMapper extends EntityMapper<HomePartnerDTO, Partner> {



    default Partner fromId(Long id) {
        if (id == null) {
            return null;
        }
        Partner partner = new Partner();
        partner.setId(id);
        return partner;
    }
}
