import { EnvironmentInterface } from '../interfaces/index.interface';
import { environment } from './environment';

export default (): EnvironmentInterface => ({ ...environment });
