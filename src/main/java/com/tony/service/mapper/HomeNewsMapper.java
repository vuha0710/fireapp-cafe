package com.tony.service.mapper;

import com.tony.domain.News;
import com.tony.service.dto.HomeNewsDTO;
import com.tony.service.dto.NewsDTO;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity {@link News} and its DTO {@link NewsDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HomeNewsMapper extends EntityMapper<HomeNewsDTO, News> {



    default News fromId(Long id) {
        if (id == null) {
            return null;
        }
        News news = new News();
        news.setId(id);
        return news;
    }
}
