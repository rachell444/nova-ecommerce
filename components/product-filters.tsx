"use client"

import { useState, useEffect, useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function ProductFilters({ onApply }: { onApply?: (filters: any) => void }) {
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const isFirstRender = useRef(true)

  // Sincronizar con URL para compartir filtros
  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategories.length) params.set("categories", selectedCategories.join(","))
    if (selectedColors.length) params.set("colors", selectedColors.join(","))
    if (selectedSizes.length) params.set("sizes", selectedSizes.join(","))
    if (priceRange[0] !== 0 || priceRange[1] !== 500) params.set("price", `${priceRange[0]}-${priceRange[1]}`)
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`)
  }, [selectedCategories, selectedColors, selectedSizes, priceRange])

  // Aplicar filtros automáticamente al cambiar
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (onApply) {
      onApply({
        categories: selectedCategories,
        colors: selectedColors,
        sizes: selectedSizes,
        priceRange,
      })
    }
  }, [selectedCategories, selectedColors, selectedSizes, priceRange])

  // Handlers para checkboxes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategories((prev) => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
  }
  const handleColorChange = (color: string) => {
    setSelectedColors((prev) => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color])
  }
  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size])
  }

  // Botón limpiar filtros
  const handleClear = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 500])
    if (onApply) {
      onApply({ categories: [], colors: [], sizes: [], priceRange: [0, 500] })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filters</h3>
        <Button variant="ghost" className="h-auto p-0 text-sm text-muted-foreground" onClick={handleClear}>
          Limpiar filtros
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["category", "price", "color", "size"]}>
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "all", label: "All Categories" },
                { id: "tshirts", label: "T-Shirts" },
                { id: "hoodies", label: "Hoodies" },
                { id: "jackets", label: "Jackets" },
                { id: "pants", label: "Pants" },
                { id: "accessories", label: "Accessories" },
              ].map(cat => (
                <div className="flex items-center space-x-2" key={cat.id}>
                  <Checkbox id={`category-${cat.id}`} checked={selectedCategories.includes(cat.id)} onCheckedChange={() => handleCategoryChange(cat.id)} />
                  <Label htmlFor={`category-${cat.id}`}>{cat.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider defaultValue={[0, 500]} max={1000} step={10} value={priceRange} onValueChange={setPriceRange} />
              <div className="flex items-center justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "black", label: "Black", color: "bg-black" },
                { id: "white", label: "White", color: "bg-white border" },
                { id: "blue", label: "Blue", color: "bg-blue-500" },
                { id: "red", label: "Red", color: "bg-red-500" },
                { id: "green", label: "Green", color: "bg-green-500" },
              ].map(c => (
                <div className="flex items-center space-x-2" key={c.id}>
                  <Checkbox id={`color-${c.id}`} checked={selectedColors.includes(c.id)} onCheckedChange={() => handleColorChange(c.id)} />
                  <Label htmlFor={`color-${c.id}`} className="flex items-center gap-2">
                    <span className={`h-4 w-4 rounded-full ${c.color}`} />
                    {c.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-4 gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map(size => (
                <div className="flex items-center space-x-2" key={size}>
                  <Checkbox id={`size-${size.toLowerCase()}`} checked={selectedSizes.includes(size)} onCheckedChange={() => handleSizeChange(size)} />
                  <Label htmlFor={`size-${size.toLowerCase()}`}>{size}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
