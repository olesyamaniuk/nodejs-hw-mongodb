import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import mongoose from 'mongoose';
import { env } from './utils/env.js';
import { getAllContacts, getContactsById } from './services/contacts.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();

      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts',
        data: contacts,
      });
    } catch (error) {
      next(error);
    }
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid contact ID',
      });
    }

    try {
      const contact = await getContactsById(contactId);

      if (!contact) {
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use('*', (req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not Found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
