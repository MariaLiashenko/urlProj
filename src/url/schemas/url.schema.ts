import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose"

@Schema({
  timestamps: true,
})
export class Url {
  @Prop({ required: true })
  linkNew: string

  @Prop({ default: "" })
  linkOld: string

  @Prop({ default: false })
  isUsed: boolean

  @Prop({ default: "24d" })
  ttl: string
}
export const UrlSchema = SchemaFactory.createForClass(Url)
