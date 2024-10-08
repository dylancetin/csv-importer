"use client"

import * as React from "react"

import { dataConfig, type DataConfig } from "@/config/data"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CsvImporter } from "@/components/csv-importer"

export function TricksTable() {
  const [data, setData] = React.useState(dataConfig.speicalTricks)

  return (
    <div className="flex flex-col gap-4">
      <CsvImporter
        fields={[
          { label: "Name", value: "name", required: true },
          { label: "Description", value: "description" },
          { label: "Points", value: "points" },
          { label: "Difficulty", value: "difficulty" },
          { label: "Style", value: "style" },
        ]}
        onImport={(parsedData) => {
          const formattedData: DataConfig["speicalTricks"] = parsedData.map(
            (item) => ({
              id: crypto.randomUUID(),
              name: String(item.name ?? ""),
              description: String(item.description ?? ""),
              points: Number.isNaN(Number(item.points))
                ? 0
                : Number(item.points),
              difficulty: String(item.difficulty ?? ""),
              style: String(item.style ?? ""),
            })
          )

          setData((prev) => [...prev, ...formattedData])
        }}
        className="self-end"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Points</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Style</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  <span className="line-clamp-1">{item.name}</span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">{item.description}</span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">{item.points}</span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">{item.difficulty}</span>
                </TableCell>
                <TableCell>
                  <span className="line-clamp-1">{item.style}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
