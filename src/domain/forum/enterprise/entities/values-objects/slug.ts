export class Slug {
  public value: string
  constructor(value: string) {
    this.value = value
  }

  static createFromText(text: string): Slug {
    const slug = text
      .normalize('NFKD')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')

    return new Slug(slug)
  }
}
