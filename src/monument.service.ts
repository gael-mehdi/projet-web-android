import { readFile } from 'node:fs/promises';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { firstValueFrom, map, tap } from 'rxjs';
import { APIMonument } from './APIMonument';
import type { Monument } from './Monument';

@Injectable()
export class MonumentService implements OnModuleInit {
  private readonly logger = new Logger(MonumentService.name);
  private readonly storage: Map<string, Monument> = new Map();

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit() {
    this.logger.log('Loading monuments from file and API');
    await Promise.all([this.loadMonumentsFromApi()]); //[this.loadMonumentsFromFile(), this.loadMonumentsFromApi()]
    this.logger.log(`${this.storage.size} monuments loaded`);
  }

  private async loadMonumentsFromFile() {
    const data = await readFile('src/photographies-monuments.json', 'utf8');
    const monuments = JSON.parse(data.toString()) as Monument[];
    monuments.forEach((monument) => this.addMonument(monument));
  }

  private async loadMonumentsFromApi() {
    await firstValueFrom(
      this.httpService
        .get<{ results: APIMonument[] }>('https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/photographies-serie-monuments-historiques-de-1851-a-1914@culture/records?select=*&where=adresse%20IS%20NOT%20NULL%20and%20edif%20IS%20NOT%20NULL%20and%20autp%20IS%20NOT%20NULL%20and%20leg%20IS%20NOT%20NULL%20&limit=100')
        .pipe(
          map((response) => response.data.results), // Extraction des résultats de l'API
          map((apiMonuments) =>
            apiMonuments.map((apiMonument) => ({
              ref: apiMonument.ref,
              edif: apiMonument.edif,
              adresse: apiMonument.adresse,
              com: apiMonument.com,
              leg: apiMonument.leg,
              video_v: apiMonument.video_v,
              geoloc: apiMonument.geoloc,
              reg_name: apiMonument.reg_name,
              dep_current_code: apiMonument.dep_current_code,
              dep_name: apiMonument.dep_name,
              favorite: false,
            })),
          ), // Transformation du format APIMonument vers Monument
          tap((monuments) =>
            monuments.forEach((monument) => this.addMonument(monument)),
          ), // Ajout des monuments au système
        ),
    );
  }

  addMonument(monument: Monument) {
    this.storage.set(monument.ref, monument);
  }

  getMonument(ref: string): Monument {
    const monument = this.storage.get(ref);

    if (!monument) {
      throw new Error(`Monument with reference ${ref} not found`);
    }

    return monument;
  }

  getAllMonuments(): Monument[] {
    return Array.from(this.storage.values()).sort((a, b) => {
      const aValue = a.edif || ''; // Utiliser une chaîne vide si a.edif est null
      const bValue = b.edif || ''; // Utiliser une chaîne vide si b.edif est null
      return aValue.localeCompare(bValue);
    });
  }
  
  getMonumentsOf(dep_current_code: string): Monument[] {
    return this.getAllMonuments()
      .filter((monument) => monument.dep_current_code === dep_current_code)
      .sort((a, b) => {
        const aValue = a.edif || ''; // Utiliser une chaîne vide si a.edif est null
        const bValue = b.edif || ''; // Utiliser une chaîne vide si b.edif est null
        return aValue.localeCompare(bValue);
      });
  }
  
  remove(ref: string) {
    this.storage.delete(ref);
  }
  
  search(term: string) {
    return Array.from(this.storage.values())
      .filter((monument) => (monument.edif || '').includes(term)) // Utiliser une chaîne vide si monument.edif est null
      .sort((a, b) => {
        const aValue = a.edif || ''; // Utiliser une chaîne vide si a.edif est null
        const bValue = b.edif || ''; // Utiliser une chaîne vide si b.edif est null
        return aValue.localeCompare(bValue);
      });
  }

  updateFavoriteStatus(ref: string, isFavorite: boolean): Monument {
    const monument = this.getMonument(ref);
    if (monument) {
      monument.favorite = isFavorite;
    }
    return monument;
  }
}
