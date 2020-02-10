class Builder {
    constructor() {
        this.query = '';
        this.limit = '';
        this.params = [];
    }
    allApartments = (page, size) => {
        this.query = `Select A.*, group_concat(I.url) images ,CO.name country,C.name city
                        from apartments A join images I on A.id = I.apartment_id 
                        join cities C on A.city_id = C.id
                        join countries CO on CO.id = C.country_id 
                        WHERE `;
        this.limit = `group by A.id limit ${(page - 1) * size}, ${size}`;
        return this;
    }
    id = (id) => {
        
        this.query += `(${!id ? '1' : (this.params.push(id), 'id = ? ')}) and `;
        return this;
    }
    user_id = (user_id) => {
        this.query += `(${!user_id ? '1' : (this.params.push(user_id), 'user_id = ? ')}) and `;
        return this;
    }
    city_id = (city_id) => {
        this.query += `(${!city_id ? '1' : (this.params.push(city_id), 'city_id = ? ')}) and `;
        return this;
    }
    price = (price) => {
        this.query += `(${!price ? '1' : (this.params.push(price), 'price = ? ')}) and `;
        return this;
    }
    number_of_room = (number_of_room) => {
        this.query += `(${!number_of_room ? '1' : (this.params.push(number_of_room), 'number_of_room = ? ')}) and `;
        return this;
    }
    number_of_bath = (number_of_bath) => {
        this.query += `(${!number_of_bath ? '1' : (this.params.push(number_of_bath), 'number_of_bath = ? ')}) and `;
        return this;
    }
    sale_status = (sale_status) => {
        this.query += `(${!sale_status ? '1' : (this.params.push(sale_status), 'sale_status = ? ')}) and `;
        return this;
    }
    minimum_price = (minPrice) => {
        this.query += `(${!minPrice ? '1' : (this.params.push(minPrice), 'price > ? ')}) and `;
        return this;
    }
    maximum_price = (maxPrice) => {
        this.query += `(${!maxPrice ? '1' : (this.params.push(maxPrice), 'price < ? ')}) and `;
        return this;
    }

    country = (countyId) => {
        this.query += `(${!countyId ? '1' : (this.params.push(countyId), 'CO.id = ? ')})  `;
        return this;
    }

    build = () => {
        this.query += this.limit;
        console.log(this.query)
        return { query: this.query, params: this.params }
    }
}


module.exports = Builder;