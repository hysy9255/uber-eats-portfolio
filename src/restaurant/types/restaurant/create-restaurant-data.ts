import { OrderType } from 'src/constants/orderType';

export class CreateRestaurantData {
  restaurantId: string;
  ownerId: string;
  logo?: string;
  lbn: string;
  dba: string;
  cuisineType: string;
  storePhone: string;
  businessEmail: string;
  website?: string;
  instagram?: string;
  mainImgUrl: string;
  sub1ImgUrl: string;
  sub2ImgUrl: string;
  bannerImgUrl: string;
  deliveryRadius: number;
  prepTime: number;
  orderType: OrderType;

  constructor(init: {
    restaurantId: string;
    ownerId: string;
    logo?: string;
    lbn: string;
    dba: string;
    cuisineType: string;
    storePhone: string;
    businessEmail: string;
    website?: string;
    instagram?: string;
    mainImgUrl: string;
    sub1ImgUrl: string;
    sub2ImgUrl: string;
    bannerImgUrl: string;
    deliveryRadius: number;
    prepTime: number;
    orderType: OrderType;
  }) {
    this.restaurantId = init.restaurantId;
    this.ownerId = init.ownerId;
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
