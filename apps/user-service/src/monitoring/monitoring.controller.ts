import { Controller, Get, Header } from "@nestjs/common";
import { MonitoringService } from "./monitoring.service";

@Controller()
export class MonitoringController {
    
    constructor(
        private readonly monitoring : MonitoringService,
    ){}

    @Get('metrics')
    @Header('Content-Type', 'text/plain')
    metrics(){
        return this.monitoring.getMetrics();
    }
    
}