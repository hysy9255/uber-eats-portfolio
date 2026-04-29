export class RestaurantDTO {
  restaurantId: string;
  logo: string | null;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  website: string | null;
  instagram: string | null;
  mainImgUrl: string;
  sub1ImgUrl: string;
  sub2ImgUrl: string;
  bannerImgUrl: string;
  deliveryRadius: number;
  prepTime: string;
  orderType: string;

  constructor(init: {
    restaurantId: string;
    logo: string | null;
    lbn: string;
    dba: string;
    cuisineType: string;
    storePhone: string;
    businessEmail: string;
    website: string | null;
    instagram: string | null;
    mainImgUrl: string;
    sub1ImgUrl: string;
    sub2ImgUrl: string;
    bannerImgUrl: string;
    deliveryRadius: number;
    prepTime: string;
    orderType: string;
  }) {
    this.restaurantId = init.restaurantId;
    this.logo = init.logo;
    this.lbn = init.lbn;
    this.dba = init.dba;
    this.cuisineType = init.cuisineType;
    this.storePhone = init.storePhone;
    this.businessEmail = init.businessEmail;
    this.website = init.website;
    this.instagram = init.instagram;
    this.mainImgUrl = init.mainImgUrl;
    this.sub1ImgUrl = init.sub1ImgUrl;
    this.sub2ImgUrl = init.sub2ImgUrl;
    this.bannerImgUrl = init.bannerImgUrl;
    this.deliveryRadius = init.deliveryRadius;
    this.prepTime = init.prepTime;
    this.orderType = init.orderType;
  }
}
