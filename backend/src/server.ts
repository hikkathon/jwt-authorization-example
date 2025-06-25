import app from './app';
import connectDB from './config/database';
import { PORT } from './config/env';

const startServer = async () => {
	await connectDB();
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
		console.log(`Local:   http://localhost:${PORT}/`);
	});
};

startServer().catch(error => {
	console.error('Failed to start server:', error);
	process.exit(1);
});
