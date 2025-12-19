import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoteService {
  private readonly logger = new Logger(NoteService.name);

  constructor(@InjectRepository(Note) private noteRepo: Repository<Note>) {}

  async create(createNoteDto: CreateNoteDto, userId: number) {
    try {
      const note = this.noteRepo.create({ ...createNoteDto, userId });
      return await this.noteRepo.save(note);
    } catch (error) {
      this.logger.error('Failed to create note', error.stack);
      throw new InternalServerErrorException('Failed to create note');
    }
  }
  async findAllBySkipTake(skip: number, take: number) {
    const [data, total] = await this.noteRepo.findAndCount({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
    return {
      data,
      total,
      skip,
      take,
      totalPages: Math.ceil(total / take),
    };
  }
async findAll() {
  try {
    const notes = await this.noteRepo.find();
    return notes;
  } catch (error) {
    this.logger.error('Failed to fetch notes', error.stack);
    throw new InternalServerErrorException('Failed to fetch note');
  }
}

  async findOne(id: number) {
    try {
      const note = await this.noteRepo.findOneBy({ id });
      if (!note) {
        this.logger.warn(`Note with ID ${id} not found`);
        throw new NotFoundException(`Note with ID ${id} not found`);
      }
      return note;
    } catch (error) {
      this.logger.error(`Failed to fetch note ID: ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch note');
    }
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    try {
      const note = await this.noteRepo.findOneBy({ id });
      if (!note) {
        this.logger.warn(`Note with ID ${id} not found`);
        throw new NotFoundException(`Note with ID ${id} not found`);
      }

      Object.assign(note, updateNoteDto);
      return await this.noteRepo.save(note);
    } catch (error) {
      this.logger.error(`Failed to update note ID: ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to update note');
    }
  }

  async remove(id: number) {
    try {
      const note = await this.noteRepo.findOneBy({ id });
      if (!note) {
        this.logger.warn(`Note with ID ${id} not found`);
        throw new NotFoundException(`Note with ID ${id} not found`);
      }

      await this.noteRepo.delete(id);
      return { message: `Note with ID ${id} deleted successfully` };
    } catch (error) {
      this.logger.error(`Failed to delete note ID: ${id}`, error.stack);
      throw new InternalServerErrorException('Failed to delete note');
    }
  }
}
