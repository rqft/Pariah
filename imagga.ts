import { BaseExtension } from "./base";
export const BASE_URL = "https://api.imagga.com/v2/";
export type Bit = 0 | 1;
export interface Response<T> {
  result: T;
  status: {
    text: string;
    type: "success" | "error";
  };
}
export type Language<R> = { en: R };
export interface ImageOptions {
  image_url?: string;
  image_upload_id?: string;
}
export interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
export interface Area {
  width: number;
  height: number;
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}
export interface TagsOptions extends ImageOptions {
  verbose?: Bit;
  limit?: number;
  threshold?: number;
  decrease_parents?: number;
  tagger_id?: string;
}
export interface TagsResponse {
  tag: Array<Tag>;
}
export interface Tag {
  confidence: number;
  tag: Language<string>;
}
export interface CategorizersResponse {
  categorizers: Array<Categorizer>;
}
export interface Categorizer {
  labels: Array<string>;
  id: string;
  title: string;
}
export interface CategoriesOptions extends ImageOptions {
  save_index?: string;
  save_id?: string;
}
export interface CategoriesResponse {
  categories: Array<Category>;
}
export interface Category {
  confidence: number;
  tag: Language<string>;
}
export interface CroppingsOptions extends ImageOptions {
  resolution?: `${number}x${number}`;
  no_scaling?: Bit;
  rect_percentage?: number;
  image_result?: Bit;
}
export interface CroppingsResponse {
  croppings: Array<Cropping>;
}
export interface Cropping extends Coordinates {
  target_width: number;
  target_height: number;
}
export type ColorsFeatureType = "object" | "overall";
export interface ColorsOptions extends ImageOptions {
  extract_overall_colors?: Bit;
  extract_object_colors?: Bit;
  overall_count?: number;
  separated_count?: number;
  deterministic?: Bit;
  features_type?: ColorsFeatureType;
}
export interface ColorsResponse {
  colors: Colors;
}
export interface Colors {
  background_colors: Array<Color>;
  color_variance: number;
  object_percentage: number;
  image_colors: Array<Color>;
  color_percent_treshold: number;
  foreground_colors: Array<Color>;
}
export interface Color {
  b: number;
  closest_palette_color: string;
  closest_palette_color_html_code: string;
  closest_palette_color_parent: string;
  closest_palette_distance: number;
  g: number;
  html_code: number;
  percent: number;
  r: number;
}
export interface FacesDetectionsOptions extends ImageOptions {
  return_face_id?: Bit;
  return_face_attributes?: Bit;
}
export interface FacesDetectionsResponse {
  faces: Array<Face>;
}
export interface Face {
  confidence: number;
  coordinates: Area;
  face_id?: string;
  attributes: Array<FacesAttributes>;
}
export interface FacesAttributes {
  type: string;
}
export interface FacesSimilarityOptions {
  face_id: string;
  second_face_id: string;
}
export interface FacesSimilarityResponse {
  score: number;
}
export interface TicketsResponse {
  ticket_id: string;
}
export interface FacesGroupingsOptions {
  faces: [string, string, string, string, string, ...string[]];
}
export interface TextResponse {
  text: Array<Text>;
}
export interface Text {
  data: string;
  coordinates: Area;
}
export interface UsageOptions {
  history?: Bit;
  concurrency?: Bit;
}
export interface UsageResponse {
  billing_period_end: string;
  billing_period_start: string;
  concurrency: UsageConcurrency;
  daily: Record<string, number>;
  daily_for: string;
  daily_processed: number;
  daily_requests: number;
  last_usage: number;
  monthly: Record<string, number>;
  monthly_limit: number;
  monthly_processed: number;
  monthly_requests: number;
  total_processed: number;
  total_requests: number;
  weekly: Record<string, number>;
  weekly_processed: number;
  weekly_requests: number;
}
export interface UsageConcurrency {
  max: number;
  now: number;
}
export interface BarcodesResponse {
  barcodes: Array<Barcode>;
}
export interface Barcode extends Coordinates {
  data: string;
  type: string;
}
export class Imagga {
  public readonly token: string;
  public raw: BaseExtension;
  constructor(token: string) {
    this.raw = new BaseExtension({
      baseUrl: BASE_URL,
      headers: {
        Authorization: token,
      },
    });
    this.token = token;
  }
  public toUrlParams(object: object) {
    return `?${Object.entries(object)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&")}`;
  }
  public async tags(options: TagsOptions, tagger_id?: string) {
    return this.raw.getJSON<Response<TagsResponse>>(
      `/tags/${tagger_id}${this.toUrlParams(options)}`
    );
  }
  public async categorizers() {
    return this.raw.getJSON<Response<CategorizersResponse>>("/categorizers");
  }
  public async categories(options: CategoriesOptions, categorizer_id?: string) {
    return this.raw.getJSON<Response<CategoriesResponse>>(
      `/categories/${categorizer_id}${this.toUrlParams(options)}`
    );
  }
  public async croppings(options: CroppingsOptions) {
    return this.raw.getJSON<Response<CroppingsResponse>>(
      `/croppings/${this.toUrlParams(options)}`
    );
  }
  public async colors(options: ColorsOptions) {
    return this.raw.getJSON<Response<ColorsResponse>>(
      `/colors/${this.toUrlParams(options)}`
    );
  }
  public async facesDetections(options: FacesDetectionsOptions) {
    return this.raw.getJSON<Response<FacesDetectionsResponse>>(
      `/faces/detections/${this.toUrlParams(options)}`
    );
  }
  public async facesSimilarity(options: FacesSimilarityOptions) {
    return this.raw.getJSON<Response<FacesSimilarityResponse>>(
      `/faces/similarity/${this.toUrlParams(options)}`
    );
  }
  public async facesGroupings(options: FacesGroupingsOptions) {
    return this.raw.postJSON<Response<TicketsResponse>>("/faces/groupings", {
      body: JSON.stringify(options),
    });
  }
  public async text(options: ImageOptions) {
    return this.raw.getJSON<Response<TextResponse>>(
      `/text/${this.toUrlParams(options)}`
    );
  }
  public async usage(options: UsageOptions = {}) {
    return this.raw.getJSON<Response<UsageResponse>>(
      `/usage/${this.toUrlParams(options)}`
    );
  }
  public async barcodes(options: ImageOptions) {
    return this.raw.getJSON<Response<BarcodesResponse>>(
      `/barcodes/${this.toUrlParams(options)}`
    );
  }
}
