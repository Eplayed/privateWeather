import { CondDto } from './cond-dto';
import { WindDto } from './wind-dto';
export class NowWeatheDto {
    cond: CondDto;
    fl: string; //体感温度
    hum: string;  //相对湿度（%）
    pcpn: string;  //降水量（mm）
    pres: string;  //气压
    tmp: string;  //温度
    vis: string;  //能见度（km）
    wind: WindDto
}