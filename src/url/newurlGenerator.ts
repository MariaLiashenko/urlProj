function generateRandomLink(alphabet: string[], numbers: number[]): string {
  let link = ""
  const alphabetLength = alphabet.length
  const numbersLength = numbers.length

  for (let i = 0; i < 8; i++) {
    const isLetter = Math.random() < 0.5

    if (isLetter) {
      const randomIndex = Math.floor(Math.random() * alphabetLength)
      link += alphabet[randomIndex]
    } else {
      const randomIndex = Math.floor(Math.random() * numbersLength)
      link += numbers[randomIndex].toString()
    }
  }

  return link
}

function generateUniqueRandomLinks(
  alphabet: string[],
  numbers: number[],
  count: number
): string[] {
  const linksSet = new Set<string>()

  while (linksSet.size < count) {
    const link = generateRandomLink(alphabet, numbers)
    linksSet.add(link)
  }

  return Array.from(linksSet)
}

const alphabetArray: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]
const numbersArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

const uniqueRandomLinks: string[] = generateUniqueRandomLinks(
  alphabetArray,
  numbersArray,
  50
)

export default uniqueRandomLinks
