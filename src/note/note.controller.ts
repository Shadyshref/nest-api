import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
  Optional,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('api/notes')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto, @Req() req) {
    const userId = req.user.sub;
    return this.noteService.create(createNoteDto, userId);
  }
  // @Get('get')
  // findAll() {
  //   return this.noteService.findAll();
  // }

  @UseGuards(AuthGuard)
  @Get()
  findAllWithPagenation(
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number,
  ) {
    const skipNumber = skip ?? 0;
    const takeNumber = take ?? 10;

    return this.noteService.findAllBySkipTake(skipNumber, takeNumber);
  }
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.noteService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteService.remove(+id);
  }
}
