import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiProperty({
    description: 'Nome do item',
    example: 'chinelo',
  })
  @IsNotEmpty({ message: 'O campo name não pode estar vazio' })
  @IsString({ message: 'O campo name deve ser uma string' })
  nome: string;

  @ApiProperty({
    description: 'descricao do item',
    example: 'item de cor tal, de marca tal',
  })
  @IsNotEmpty({ message: 'O campo descricao não pode estar vazio' })
  @IsString({ message: 'O campo descricao deve ser uma string' })
  descricao: string;

  @ApiProperty({
    description: 'Senha do usuário, com no mínimo 6 caracteres',
    example: 'senhaSegura123',
    minLength: 6,
  })
  @IsOptional({ message: 'O campo iamgem é opcional' })
  @IsString({
    message: 'O campo senha deve ser uma string, melhor que seja base64',
  })
  image: string;

  @ApiProperty({
    description: 'Senha do usuário, com no mínimo 6 caracteres',
    example: 'senhaSegura123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'O id do usuario é obrigatorio' })
  @IsNumber()
  authorId: number;
}
