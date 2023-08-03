import { Get, Controller, Post, Body } from "@nestjs/common"
import { CreateUrlDto } from "./dto/create-url.dto"
import { Url } from "./schemas/url.schema"
import { UrlService } from "./url.service"
import uniqueRandomLinks from "./newurlGenerator"

@Controller("urls")
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Get()
  async getAllUrls(): Promise<Url[]> {
    return this.urlService.findAll()
  }

  @Post()
  async createUrlsFromRandomLinks(): Promise<Url[]> {
    const createdUrls: Url[] = []
    for (const link of uniqueRandomLinks) {
      const urlDto: CreateUrlDto = {
        linkNew: link,
        linkOld: "",
        isUsed: false,
        ttl: "24d",
      }
      const createdUrl: Url = await this.urlService.create(urlDto)
      createdUrls.push(createdUrl)
    }

    return createdUrls
  }

  @Post("update")
  async updateUrlWithOldUrl(
    @Body() payload: { linkOld: string }
  ): Promise<Url | null> {
    const { linkOld } = payload
    const updatedUrl = await this.urlService.updateUrlWithOldUrl(linkOld)

    return updatedUrl
  }

  @Post("getLinkOld")
  async getLinkOldFromLinkNew(
    @Body() payload: { linkNew: string }
  ): Promise<string | null> {
    const { linkNew } = payload
    const linkOld = await this.urlService.getLinkOldFromLinkNew(linkNew)
    return linkOld
  }
}
