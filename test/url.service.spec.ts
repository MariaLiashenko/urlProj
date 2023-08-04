import { Test, TestingModule } from "@nestjs/testing"
import { Model } from "mongoose"
import { Url } from "../src/url/schemas/url.schema"
import { UrlService } from "../src/url/url.service"
import { getModelToken } from "@nestjs/mongoose"
import { NotFoundException } from "@nestjs/common"

describe("UrlService", () => {
  let service: UrlService
  let urlModel: Model<Url>

  const mockUrl = {
    _id: "64cb604b5bed3b7fe21d1fe2",
    linkNew: "d85am10l",
    linkOld:
      "https://hdtoday.tv/watch-tv/watch-the-summer-i-turned-pretty-hd-82873.9758536",
    isUsed: true,
    ttl: "24d",
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: getModelToken(Url.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<UrlService>(UrlService)
    urlModel = module.get<Model<Url>>(getModelToken(Url.name))
  })

  describe("findAll", () => {
    it("should return an array of Urls", async () => {
      const mockUrls: Url[] = [
        { ...mockUrl },
        { ...mockUrl, _id: "anotherId", linkNew: "anotherLink" },
      ]
      jest.spyOn(urlModel, "find").mockResolvedValue(mockUrls)

      const urls = await service.findAll()

      expect(urls).toEqual(mockUrls)
    })
  })

  describe("create", () => {
    it("should create and return a new Url", async () => {
      jest.spyOn(urlModel, "create").mockResolvedValue(mockUrl as any)

      const createdUrl = await service.create(mockUrl)

      expect(createdUrl).toEqual(mockUrl)
    })
  })

  describe("findUrlToUpdate", () => {
    it("should find and return an unused Url to update", async () => {
      jest.spyOn(urlModel, "findOne").mockResolvedValue(mockUrl)

      const urlToUpdate = await service.findUrlToUpdate("oldUrl")

      expect(urlToUpdate).toEqual(mockUrl)
    })

    it("should throw a NotFoundException if no unused Url is found", async () => {
      jest.spyOn(urlModel, "findOne").mockResolvedValue(null)

      await expect(service.findUrlToUpdate("oldUrl")).rejects.toThrowError(
        NotFoundException
      )
    })
  })

  describe("updateUrlWithOldUrl", () => {
    it("should find and update an unused Url with the given oldUrl", async () => {
      jest.spyOn(urlModel, "findOneAndUpdate").mockResolvedValue(mockUrl)

      const updatedUrl = await service.updateUrlWithOldUrl("oldUrl")

      expect(updatedUrl).toEqual(mockUrl)
    })
  })

  describe("getLinkOldFromLinkNew", () => {
    it("should find and return linkOld for the given linkNew", async () => {
      jest.spyOn(urlModel, "findOne").mockResolvedValue(mockUrl)

      const linkOld = await service.getLinkOldFromLinkNew("linkNew")

      expect(linkOld).toEqual(mockUrl.linkOld)
    })

    it("should throw a NotFoundException if the linkNew is not found", async () => {
      jest.spyOn(urlModel, "findOne").mockResolvedValue(null)

      await expect(
        service.getLinkOldFromLinkNew("linkNew")
      ).rejects.toThrowError(NotFoundException)
    })
  })
})
