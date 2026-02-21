// Carga de Datos — Upload de CSV/Excel con preview y validación
"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Clock,
  X,
} from "lucide-react";
import { demoUploads } from "@/lib/demo-data";

// Estado del upload visual
type UploadState = "idle" | "selected" | "uploading" | "done";

function UploadStatusBadge({ status }: { status: string }) {
  const config: Record<
    string,
    { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
  > = {
    processed: { label: "Procesado", variant: "default" },
    processing: { label: "Procesando", variant: "secondary" },
    uploaded: { label: "Subido", variant: "outline" },
    failed: { label: "Error", variant: "destructive" },
    archived: { label: "Archivado", variant: "secondary" },
  };
  const c = config[status] ?? { label: status, variant: "default" as const };
  return <Badge variant={c.variant}>{c.label}</Badge>;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function CargaPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dataType, setDataType] = useState("ventas");

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadState("selected");
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadState("selected");
    }
  }

  function handleUpload() {
    setUploadState("uploading");
    // Simular upload
    setTimeout(() => setUploadState("done"), 2000);
  }

  function handleClear() {
    setSelectedFile(null);
    setUploadState("idle");
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Carga de Datos"
        description="Sube tus archivos de ventas, costos e inventario"
      />

      {/* Zona de upload */}
      <Card>
        <CardHeader>
          <CardTitle>Subir Archivo</CardTitle>
          <CardDescription>
            Formatos aceptados: CSV, Excel (.xlsx, .xls). Tamaño máximo: 50 MB.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selector de tipo de datos */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Tipo de datos:</span>
            <Select value={dataType} onValueChange={setDataType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ventas">Ventas</SelectItem>
                <SelectItem value="costos">Costos</SelectItem>
                <SelectItem value="inventario">Inventario</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {uploadState === "idle" && (
            <label
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 py-12 transition-colors hover:border-primary/50 hover:bg-muted/50"
            >
              <Upload className="h-10 w-10 text-muted-foreground/50 mb-3" />
              <p className="text-sm font-medium">
                Arrastra un archivo aquí o haz clic para seleccionar
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                CSV, Excel — Máx. 50 MB
              </p>
              <input
                type="file"
                className="hidden"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileSelect}
              />
            </label>
          )}

          {uploadState === "selected" && selectedFile && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatBytes(selectedFile.size)} · Tipo: {dataType}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4 flex gap-2">
                <Button onClick={handleUpload}>Cargar Archivo</Button>
                <Button variant="outline" onClick={handleClear}>
                  Cancelar
                </Button>
              </div>
            </div>
          )}

          {uploadState === "uploading" && selectedFile && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{selectedFile.name}</p>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-2/3 animate-pulse rounded-full bg-primary" />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Procesando...
                  </p>
                </div>
              </div>
            </div>
          )}

          {uploadState === "done" && selectedFile && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-600 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-emerald-800">
                    Archivo cargado exitosamente
                  </p>
                  <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-emerald-600 font-medium">34</p>
                      <p className="text-xs text-emerald-700">Registros cargados</p>
                    </div>
                    <div>
                      <p className="text-amber-600 font-medium">2</p>
                      <p className="text-xs text-amber-700">Advertencias</p>
                    </div>
                    <div>
                      <p className="text-red-600 font-medium">0</p>
                      <p className="text-xs text-red-700">Errores</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={handleClear}
                  >
                    Cargar otro archivo
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Historial de cargas */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Cargas</CardTitle>
          <CardDescription>
            Archivos procesados anteriormente
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Archivo</TableHead>
                <TableHead className="hidden sm:table-cell">Tamaño</TableHead>
                <TableHead className="hidden md:table-cell">Registros</TableHead>
                <TableHead className="hidden md:table-cell">Errores</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoUploads.map((upload) => {
                const meta = upload.metadata as {
                  rows?: number;
                  errors?: number;
                  warnings?: number;
                };
                return (
                  <TableRow key={upload.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          {upload.original_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                      {formatBytes(upload.size_bytes)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">
                      {meta.rows ?? "—"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm">
                      {(meta.errors ?? 0) > 0 ? (
                        <span className="flex items-center gap-1 text-destructive">
                          <AlertCircle className="h-3 w-3" />
                          {meta.errors}
                        </span>
                      ) : (
                        <span className="text-emerald-600">0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(upload.created_at).toLocaleDateString("es-CL")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <UploadStatusBadge status={upload.status} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
