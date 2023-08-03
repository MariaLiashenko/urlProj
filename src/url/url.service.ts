import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import * as mongoose from "mongoose"
import { Url } from "./schemas/url.schema"

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name)
    private urlModel: mongoose.Model<Url>
  ) {}

  async findAll(): Promise<Url[]> {
    const urls = await this.urlModel.find()
    return urls
  }

  async create(url: Url): Promise<Url> {
    const res = await this.urlModel.create(url)
    return res
  }

  async findUrlToUpdate(linkOld: string): Promise<Url> {
    const urlToUpdate = await this.urlModel.findOne({
      isUsed: false,
      linkOld: "",
    })

    if (!urlToUpdate) {
      throw new NotFoundException("No available URL to update")
    }

    return urlToUpdate
  }

  async updateUrlWithOldUrl(linkOld: string): Promise<Url | null> {
    const unusedUrl = await this.urlModel.findOneAndUpdate(
      { isUsed: false, linkOld: "" },
      { $set: { isUsed: true, linkOld: linkOld } },
      { new: true }
    )
    return unusedUrl
  }

  async getLinkOldFromLinkNew(linkNew: string): Promise<string | null> {
    const url = await this.urlModel.findOne({ linkNew: linkNew })
    if (url) {
      return url.linkOld
    }
    if (!url) {
      throw new NotFoundException("Not found")
    }
    return null
  }
}
